import SearchBanner from 'components/home/SearchBanner';
// import Banner from '../components/home/Banner';
import MainFeed from '../components/home/MainFeed';
import { useState } from 'react';
import SearchFeed from 'components/home/SearchFeed';

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
