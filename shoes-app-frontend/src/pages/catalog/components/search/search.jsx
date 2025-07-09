import styled from 'styled-components';
import { IconLabel, Input } from '../../../../components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
     return (
          <div className={className}>
               <div className="search-block">
                    <Input
                         className="input-search"
                         width="250px"
                         height="22px"
                         marginBottom="4px"
                         border="none"
                         placeholder="Введите название модели..."
                         value={searchPhrase}
                         onChange={onChange}
                    />
                    <IconLabel
                         className="icon-search"
                         icon={<FaSearch />}
                         size={16}
                         color="#3d588b"
                    />
               </div>
          </div>
     );
};

export const Search = styled(SearchContainer)`
     .search-block {
          border: 1px solid #ccc;
          position: absolute;
          display: flex;
          align-items: center;
          width: 250px;
          right: 20px;
          top: 80px;
          border-radius: 4px;
          padding: 4px;
     }

     .icon-search {
          background-color: white;
          border-radius: 4px;
          margin: -12px -19px -12px;
          height: 22px;
     }

     .input-search {
          box-sizing: border-box;
     }

     .input-search:focus {
          outline: none;
     }
`;
