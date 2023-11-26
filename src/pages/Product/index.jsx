import { useNavigate } from "react-router-dom";

import { Container, Header, Item } from "./styles";
import { Button } from '../../components/Button';
import { USER_ROLE } from '../../utils/roles';
import { useAuth } from '../../hooks/auth';

export function Product() {
  const { user } = useAuth()
  const navigate = useNavigate();

  const products = Array(20)
    .fill({ name: 'Produto' })
    .map((item, index) => (`${item.name} ${index + 1}`));

  return (
    <Container>
      <Header>
        <h1>Produtos</h1>

        <nav>
          {user.role == USER_ROLE.ADMIN && <Button title="Cadastrar" />}
          <Button title="Voltar" onClick={() => navigate('/')} />
        </nav>
      </Header>

      {
        products.map((product) => (
          <Item key={product}>
            <span>{product}</span>
          </Item>
        ))
      }
    </Container>

  )
}