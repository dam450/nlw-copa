interface HomeProps {
  poolCount: number
  guessCount: number
}

import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatar from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import { api } from '../lib/axios'

export default function Home(props: HomeProps) {
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main className='max-w-lg'>
        <Image src={logoImg} alt="Logo da NLW Copa"/>
        <h1 className='text-white mt-14 text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatar} alt="Imagens de avatares de usuários" />
          <strong className='text-gray-100 font-bold text-xl'>
            <span className='text-ignite-500'>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form className='mt-10 flex gap-2'>
          <input 
            type="text" name="" id="" required placeholder='Qual nome do seu bolão?'
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
          />
          <button 
            type="submit" 
            className='bg-yellow-500 hover:bg-yellow-700 font-bold uppercase leading-4 px-6 py-4 rounded text-sm text-gray-950'
          >Criar meu bolão</button>
        </form>

        <p className='mt-4 max-w-sm text-gray-300 text-sm leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 text-gray-100 flex items-center justify-between' >
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'/>

          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>
      <Image 
        src={appPreviewImage} 
        alt="Dois smartphones exibindo uma prévia da aplicação" 
        quality={80}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  
  const [poolCountResponse, guessCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count')
  ])


  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    }
  }
}