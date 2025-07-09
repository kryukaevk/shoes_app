import styled from 'styled-components';
import { IconLabel, Input } from '../../../../components';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CatalogMini } from '../../catalog-mini';
import { debounce } from '../utils';

const SearchMobileContainer = ({ className }) => {
     const [searchPhrase, setSearchPhrase] = useState('');
     const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState('');
     const [isCatalogVisible, setIsCatalogVisible] = useState(false);
     const catalogMiniRef = useRef(null);

     const debouncedSearch = useMemo(
          () =>
               debounce((value) => {
                    setDebouncedSearchPhrase(value);
                    setIsCatalogVisible(!!value);
               }, 500),
          []
     );

     const onSearch = (e) => {
          const value = e.target.value;
          setSearchPhrase(value);
          debouncedSearch(value);
     };

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (
                    catalogMiniRef.current &&
                    !catalogMiniRef.current.contains(event.target)
               ) {
                    setIsCatalogVisible(false);
               }
          };

          document.addEventListener('mousedown', handleClickOutside);
          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, []);

     const hideCatalog = () => {
          setIsCatalogVisible(false);
     };

     return (
          <div className={className}>
               <div className="search-block">
                    <div className="input-block">
                         <Input
                              className="input-search"
                              width="225px"
                              height="22px"
                              marginBottom="4px"
                              border="none"
                              radius="none"
                              placeholder="Введите название модели..."
                              value={searchPhrase}
                              onChange={onSearch}
                         />
                    </div>
                    <IconLabel
                         className="icon-search"
                         icon={<FaSearch />}
                         size={14}
                         margin="4px"
                         color="#3d588b"
                    />
               </div>
               {isCatalogVisible && (
                    <div ref={catalogMiniRef}>
                         <CatalogMini
                              debouncedSearchPhrase={debouncedSearchPhrase}
                              hideCatalog={hideCatalog}
                              setSearchPhrase={setSearchPhrase}
                         />
                    </div>
               )}
          </div>
     );
};

export const SearchMobile = styled(SearchMobileContainer)`
     margin-top: -4px;
     border-radius: 4px;
     background-color: white;

     .search-block {
          display: flex;
          align-items: center;
          width: 250px;
          padding: 4px;
     }

     .icon-search {
          position: absolute;
          left: 312px;
          top: 33px;
          background-color: white;
          margin: -26px -81px -12px;
          height: 22px;
     }

     .input-search {
          box-sizing: border-box;
     }

     .input-search:focus {
          outline: none;
     }
`;
