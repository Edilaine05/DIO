import React from 'react'
import { Card } from '../../components/Card';
import { UserInfo } from '../../components/UserInfo';

import { Header } from '../../components/Header';

import { Container, Column, Title, TitleHighlight } from './styles';

const Feed = () => {
  return (
    <>
        <Header autenticado={true}/>
        <Container>
            <Column flex={3}>
                <Title>Feed</Title>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Column>
            <Column flex={1}>
              <TitleHighlight> # RANKING TOP 5 DA SEMANA </TitleHighlight>
                <UserInfo nome="Edilaine Martins" image="https://avatars.githubusercontent.com/u/116959329?s=96&v=4" percentual={25}/>
                <UserInfo nome="Edilaine Martins" image="https://avatars.githubusercontent.com/u/116959329?s=96&v=4" percentual={40}/>
                <UserInfo nome="Edilaine Martins" image="https://avatars.githubusercontent.com/u/116959329?s=96&v=4" percentual={57}/>
                <UserInfo nome="Edilaine Martins" image="https://avatars.githubusercontent.com/u/116959329?s=96&v=4" percentual={5}/>
                <UserInfo nome="Edilaine Martins" image="https://avatars.githubusercontent.com/u/116959329?s=96&v=4" percentual={99}/>
            </Column>
        </Container>
    </>
  )
}

export { Feed }; 