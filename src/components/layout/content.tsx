import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Container = styled.main`
    display: flex;
    justify-self: center;
    margin: 20px;
    align-self: center;
    width: 100%;
    max-width: 800px;
`;

export const Content = ({ children }: { children: ReactNode }) => {
    return <Container>{children}</Container>;
};
