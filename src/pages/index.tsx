// interface HomeProps {
//   count: number
// }

import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatar from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'

export default function Home() {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="Logo da NLW Copa"/>
        <h1 className='text-white'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div>
          <Image src={usersAvatar} alt="Imagens de avatares de usuários" />
          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" name="" id="" required placeholder='Qual nome do seu bolão?'/>
          <button type="submit" >Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div>
          <div>
            <Image src={iconCheck} alt="" />
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div>
            <Image src={iconCheck} alt="" />
            <div>
              <span>+192.847</span>
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

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()

//   console.log(data)

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }