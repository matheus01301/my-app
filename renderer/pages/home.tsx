import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '../stitches.config';
import Alarms from '../src/components/layout/Alarms';
import GridView from '../src/components/GridView/GridView';

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#09090A',
  padding: '20px',
});

const ContainerGrid = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#09090A',
  height:'100%'
});

const Title = styled('div', {
  color: 'white',
  fontSize: '24px',
});

const Button = styled('button', {
  backgroundColor: '#1A73E8',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#155AB5',
  }
});

export default function HomePage() {
  return (
    <React.Fragment>
      <Container>
        <Title>Wells</Title>
        <Button>+ New Well</Button>
      </Container>
      <div style={{width:'100%', height:'70vh'}}>
        <ContainerGrid>
          <GridView />
        </ContainerGrid>
      </div>
    </React.Fragment>
  );
}