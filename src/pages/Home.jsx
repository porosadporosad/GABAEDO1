import React, { useState } from 'react';
import Banner from '../components/Banner';
import CurationList from '../components/CurationList';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div>
      <Banner onSearch={setSearchKeyword} />
      <CurationList keyword={searchKeyword} />
    </div>
  );
}
