import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';


export default function Jogar() {
  
  const [data, setData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id){
      router.push('/menu')
    } else {
      buscarId();
    }
  }, [id, router]);

  const buscarId = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/'); // Redirecionar se o token não estiver disponível
        return;
      }

      const response = await fetch(`http://localhost:8080/respostas/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.ok) {
        const dados = await response.json();
        if (dados) {
          setData(dados);
        } else {
          router.push('/menu');
        }
      } else {
        console.error('Erro ao buscar dados:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    setIsLoading(false);
  };


  const handleButtonClick = (name) => {
    router.push(`/${name}?id=${id}`);
  };

  
  if (isLoading) {
    return <Loading/>; // Exibir um componente de loading enquanto carrega os dados do banco
  }

 
  return (
    <div>
      <MyHead/>
      <Layout>
          <button className='circular-button circular-button-one' onClick={() => handleButtonClick('nivelOne')}>
            <Image
              className='circular-image'
              src="/src/mapa/numero1.png"
              width={150}
              height={150}
              alt="numero1"
              priority
            />
          </button>
          <button className='circular-button circular-button-two' onClick={() => handleButtonClick('nivelTwo')}>
            <Image
              className='circular-image'
              src={data && data.dataRespostas && data.dataRespostas.statusNivel1 === 2 ? "/src/mapa/numero2.png" : "/src/mapa/numero2ds.png"}
              width={150}
              height={150}
              alt="numero2"
              priority
            />
          </button>
          <button className='circular-button circular-button-three' onClick={() => handleButtonClick('nivelThree')}>
            <Image
              className='circular-image'
              src={data && data.dataRespostas && data.dataRespostas.statusNivel2 === 2 ? "/src/mapa/numero3.png" : "/src/mapa/numero3ds.png"}
              width={150}
              height={150}
              alt="numero3"
              priority
            />
          </button>
          <button className='circular-button circular-button-four' onClick={() => handleButtonClick('nivelFour')}>
            <Image
              className='circular-image'
              src={data && data.dataRespostas && data.dataRespostas.statusNivel3 === 2 ? "/src/mapa/numero4.png" : "/src/mapa/numero4ds.png"}
              width={150}
              height={150}
              alt="numero4"
              priority
            />
          </button>
      </Layout>    
    </div>
  );
}
