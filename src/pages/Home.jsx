import React, { useState } from 'react';
import Banner from '../components/Banner';
import MainFeed from '../components/MainFeed';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div>
      <Banner onSearch={setSearchKeyword} />
      <MainFeed keyword={searchKeyword} />
    </div>
  );
}
