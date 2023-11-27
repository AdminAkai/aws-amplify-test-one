import { FC, FormEvent, useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import { uploadData, getUrl, remove } from 'aws-amplify/storage'
import { generateClient } from 'aws-amplify/api'

import { listNotes } from './shared/graphql/queries'
import { Note } from './shared/graphql/API'
import { createNote, deleteNote } from './shared/graphql/mutations'

import config from './aws-exports'

import './assets/fonts/stylesheet.css'
import './App.css'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(config)

const client = generateClient()

const App: FC<{ signOut?: any }> = ({ signOut }) => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const apiData = await client.graphql({ query: listNotes })
    const notesFromAPI = apiData?.data?.listNotes?.items || []
    const notesWithImages = await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const imgUrl = await getUrl({ key: note.image })
          note.image = imgUrl.url.href
        }
        return note
      })
    )
    setNotes(notesWithImages)
  }

  const createNoteMutation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const description = form.get('description') as string
    const img = form.get('image')
    if (img) {
      await uploadData({
        key: name,
        data: img,
        options: {
          accessLevel: 'guest',
        },
      }).result
      const data = {
        name,
        description,
        image: name,
      }
      await client.graphql({
        query: createNote,
        variables: { input: data },
      })
      fetchNotes()
      e.currentTarget.reset()
    }
  }

  const deleteNoteMutation = async ({
    id,
    name,
  }: {
    id: string
    name: string
  }) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
    await remove({ key: name })
    await client.graphql({
      query: deleteNote,
      variables: { input: { id } },
    })
  }

  return (
    <View className='App'>
      <Heading level={1}>My Notes App</Heading>
      <View as='form' margin='3rem 0' onSubmit={createNoteMutation}>
        <Flex direction='row' justifyContent='center'>
          <TextField
            name='name'
            placeholder='Note Name'
            label='Note Name'
            labelHidden
            variation='quiet'
            required
          />
          <TextField
            name='description'
            placeholder='Note Description'
            label='Note Description'
            labelHidden
            variation='quiet'
            required
          />
          <View
            name='image'
            as='input'
            type='file'
            style={{ alignSelf: 'end' }}
          />
          <Button type='submit' variation='primary'>
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin='3rem 0'>
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Text as='strong' fontWeight={700}>
              {note.name}
            </Text>
            <Text as='span'>{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${note.image}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation='link' onClick={() => deleteNoteMutation(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  )

  // return (
  //   <ThemeProvider theme={theme[mode]}>
  //     <BrowserRouter>
  //       <GlobalStyle />
  //       <Routes>
  //         <Route path='/' element={<Main />}>
  //           <Route index element={<Landing />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </ThemeProvider>
  // )
}

export default withAuthenticator(App)
