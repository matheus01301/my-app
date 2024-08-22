import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '../stitches.config';
import Alarms from '../src/components/layout/Alarms';

const Teste = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  background: '#09090A',
  alignItems: 'center',
  height:'100%',
});

export default function HomePage() {
  const [message, setMessage] = useState('No message found')
  const [collapsed, setCollapsed] = useState(false);


  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <Teste>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
        <button
          onClick={() => {
            window.ipc.send('message', 'Hello')
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </Teste>
    </React.Fragment>
  )
}
