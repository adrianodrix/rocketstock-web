import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import { api } from '../../services/api'
import { useState } from "react";
import { Item, Header } from "../Product/styles";
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { USER_ROLE } from '../../utils/roles';

export function SalesReport() {
  const [sales, setSales] = useState([])
  const navigate = useNavigate();
  const { user } = useAuth()

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/sales', { withCredentials: true })
      setSales(data)
    }
    fetchData();
  }, [])

  return (
    <Container>
      
      <Header>
      <h1>Relatório de Vendas</h1>

        <nav>
          {user.role == USER_ROLE.ADMIN && <Button title="Cadastrar" />}
          <Button title="Voltar" onClick={() => navigate('/')} />
        </nav>
      </Header>
      {
        sales && sales.length > 0 && sales.map((sale, index) => (
          <Item key={index}>
            <span>{sale}</span>
          </Item>
        ))
      }
    </Container>

  )
}