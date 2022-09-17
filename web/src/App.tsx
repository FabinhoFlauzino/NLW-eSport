import './styles/main.css'
import logo from './assets/logo-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/Input'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  const url = 'http://localhost:3333'

  useEffect(() => {
    fetch(`${url}/games`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu
        <span className='bg-nlw-gradient text-transparent bg-clip-text'> duo </span>
        está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] p-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          rounded-lg w-[480px] shadow-xl'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input
                  type='text'
                  id="game"
                  placeholder='Selecione o game que deseja jogar'
                  className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input type='text' id="name" placeholder='Como te chamam dentro do game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearPlaying">Joga a quantos anos?</label>
                  <Input type='number' id="yearPlaying" placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Joga a quantos anos?</label>
                  <Input type='text' id="discord" placeholder='Usuario#0000' />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando constuma jogar?</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Domingo'>D</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Segunda'>S</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Terça'>T</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Quarta'>Q</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Quinta'>Q</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Sexta'>S</button>
                    <button className='w-10 h-10 rounded bg-zinc-900' title='Sábado'>S</button>
                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="hourStart" type="time" placeholder='De' />
                    <Input id="hourEnd" type="time" placeholder='Até' />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-bold'>Cancelar</Dialog.Close>
                <button className='bg-violet-500 px-5 h-12 rounded-md font-bold flex items-center gap-3 hover:bg-violet-600' type="submit">
                  <GameController  size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App
