import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Page = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #212121;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 50px;
  color: #ffffff;
`;

const MyLink = styled(Link)`
    margin-top: 20px;
    font-size: 17px;
    color: #424242;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: #ffffff;
    }
`;

function Index() {
    return (
        <Page>
            <Title>CLog</Title>
            <MyLink to="/form">Create</MyLink>
        </Page>
    );
}

export default Index;
