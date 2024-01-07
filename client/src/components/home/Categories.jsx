import { Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        background: #4169E1;
        color: #fff;
    }
`;

const StyledTableContainer = styled(TableContainer)`
    margin-top: 20px;
    margin-left:20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px; /* Adjust the padding for the whole table container */
`;

const StyledTable = styled(Table)`
    min-width: 350px;
`;

const StyledTableRow = styled(TableRow)`
    &:hover {
        background-color: #f5f5f5;
    }
`;

const StyledTableCell = styled(TableCell)`
    font-weight: bold;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #6495ED;
    }
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>

            <StyledTableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>
                                <StyledLink to={"/"}>
                                    All Categories
                                </StyledLink>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(category => (
                            <StyledTableRow key={category.id}>
                                <StyledTableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </StyledTableContainer>
        </>
    );
};

export default Categories;
