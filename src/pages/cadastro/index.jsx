import { useNavigate  } from "react-router-dom";
import { MdEmail, MdHome, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, explain, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const handleClickLogin= () => {
        navigate('/login')
    };

    const onSubmit = async (formData) => {
        try {
            // Verifique se o usuário já existe com um GET request
            const { data } = await api.get(`/users?email=${formData.email}`);
    
            if (data.length > 0) { // Usuário já existe
                alert('Usuário já cadastrado');
                return; // Encerre a função se o usuário existir
            }
    
            // Caso o usuário não exista, faça o cadastro com POST
            await api.post('/users', { email: formData.email, senha: formData.senha, name: formData.name });
            alert('Cadastro realizado com sucesso!');
        } catch (e) {
            console.error("Erro ao tentar cadastrar usuário:", e);
            alert('Ocorreu um erro ao tentar cadastrar. Por favor, tente novamente mais tarde.');
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
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo"   leftIcon={<MdPerson color= "#8647AD"/>} name="name"  control={control} />
                    <Input placeholder="E-mail" leftIcon={<MdEmail color= "#8647AD"/>} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock color= "#8647AD"/>}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <explain>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</explain>
                </Row>
                <div>
                    <p>Já tenho conta <CriarText onClick={handleClickLogin}>Fazer Login</CriarText > </p>
                </div>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }