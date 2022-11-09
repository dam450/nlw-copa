import { Heading, useToast, VStack } from 'native-base'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import { api } from '../services/api'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
    
  const toast = useToast()
  const { navigate } = useNavigation()
  
  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Informe um código para buscá-lo!',
          placement: 'top',
          bgColor: 'red.500'
        })        
      }

      if (code.length < 6) {
        return toast.show({
          title: 'Um código válido deve ter 6 caracteres!',
          placement: 'top',
          bgColor: 'red.500'
        })        
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })   

      setCode('')
      setIsLoading(false)

      navigate('pools')

    } catch (error) {
      console.error(error)
      setIsLoading(false)

      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Bolão nao encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response?.data?.message === 'You already joined this pool.') {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
      
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          color="white"
          fontSize="lg"
          fontFamily="heading"
          textAlign="center"
          mb={8}
        >
          Encontre um bolão através de{'\n'} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize='characters'
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}
