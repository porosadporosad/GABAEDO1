// import Banner from '../components/home/Banner';
import MainFeed from 'components/home/MainFeed';
import SearchFeed from 'components/home/SearchFeed';
import SearchBanner from 'components/home/SearchBanner';
import { useState } from 'react';

export default function Home() {
  const [searchKeyword, setSerchKeyword] = useState('');

  return (
    <div>
      {/* <Banner /> */}
      <SearchBanner setSerchKeyword={setSerchKeyword} />
      {searchKeyword ? <SearchFeed searchKeyword={searchKeyword} /> : <MainFeed />}
    </div>
  );
}
