import styled from 'styled-components';
import axios from 'axios';
import { Dispatch, useContext } from 'react';
import { ProductContext } from '../../../ProductContext';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../api/market';
import { Product } from '../../../pages/Market';

interface ClickedStyle {
  $index: number;
  $categoryIndex: number;
}

interface SelectCategoryProps {
  dummyCategory: string[];
  setProductList: Dispatch<Product[]>;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  dummyCategory,
  setProductList,
}) => {
  const { setCategoryIndex, categoryIndex } = useContext(ProductContext);
  const navigate = useNavigate();

  const selectCategory = async (index: number) => {
    try {
      setCategoryIndex(index);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login', { replace: true });
        return;
      }
      const products = await getProducts(token, index);
      setProductList(products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
        if (error?.response?.status === 401) {
          navigate('/login');
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  return (
    <CategoryBox>
      {dummyCategory.map((category: string, index: number) => (
        <Category
          key={category}
          $index={index}
          onClick={() => selectCategory(index)}
          $categoryIndex={categoryIndex}
        >
          {category}
        </Category>
      ))}
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  width: 100vw;
  padding: 10px;
  position: fixed;
  top: 0;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const Category = styled.button<ClickedStyle>`
  width: 90px;
  height: 40px;
  color: ${({ $categoryIndex, $index, theme }) =>
    $categoryIndex === $index ? theme.colors.BLUE_2 : '#969696'};
  border: 1px solid
    ${({ $categoryIndex, $index, theme }) =>
      $categoryIndex === $index ? theme.colors.BLUE_2 : '#dbdbdb'};
  background-color: ${({ $categoryIndex, $index }) =>
    $categoryIndex === $index ? '#D9E4F4' : 'white'};
  flex-shrink: 0;
  border-radius: 25px;
`;
export default SelectCategory;
