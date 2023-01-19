import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from '../login/styles';

const schema = yup.object({
    email: yup.string().email('Email invalido').required('Campo obrigatório'),
    password: yup.string().min(4, 'No minimo 4 caracters').required('Campo obrigatório'),
  }).required();

const Login = () => {

    const navigate = useNavigate()

 const handleClickSignUp = () => {
        navigate('/signup')
    }
    const { control, handleSubmit, formState: { errors  } } = useForm({
        
        resolver: yupResolver(schema),
        
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&password=${formData.password}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou password inválido')
        }catch(e){
            alert('Houve um erro. Tente novamente.')
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" errorMessage={errors?.email?.message} control={control} />
                    
                    <Input type="password" placeholder="password" leftIcon={<MdLock />}  name="password" errorMessage={errors?.password?.message} control={control} />
                   
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Esqueci minha password</EsqueciText>
                    <CriarText onClick={handleClickSignUp}>Criar Conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }