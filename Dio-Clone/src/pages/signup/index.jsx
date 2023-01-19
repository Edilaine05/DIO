import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import { Container, Title, Column, TitleSignUp, SubtitleSignUp, InfoText, Row, Wrapper,SingUpText,TextBtn } from '../signup/styled';


const schema = yup.object({
    email: yup.string().email('Email invalido').required('Campo obrigatório'),
    name: yup.string().min(3, 'No minimo 3 caracters').required('Campo obrigatório'),
    password: yup.string().min(4, 'No minimo 4 caracters').required('Campo obrigatório'),
   
  }).required();

const SignUp = () => {

    const navigate = useNavigate()
   
        
   

    const { control, handleSubmit, register, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',  
       
    });

    const onSubmit = function (e) {
        e.preventDefault();
        api.post('http://localhost:8001/users').then((response) => {
            
        navigate('/login')
            
          });;

        console.log(e);
    };

    

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleSignUp>Comece agora grátis</TitleSignUp>
                <SubtitleSignUp>Criesua conta e make the change._</SubtitleSignUp>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Input placeholder="Nome" leftIcon={<MdPerson />} type="text" name="name" errorMessage={errors?.name?.message} control={control} />
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" errorMessage={errors?.email?.message} control={control}  />   
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}name="password" errorMessage={errors?.password?.message} control={control} />
                   
                    <Button title="Criar minha conta" variant="secondary" type= "submit" />
                </form>
                <Row>
                    <InfoText>
                        Ao clicar em "criar minha conta grátis",declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                    </InfoText>
                    <SingUpText>Já tenho conta. <TextBtn href="/login">Fazer login </TextBtn> </SingUpText>
                </Row>
                    
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { SignUp }