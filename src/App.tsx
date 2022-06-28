import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Error } from 'views/Error';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />

      <div className='flex flex-1'>
        <Sidebar />
        <main className="flex-1">
          <Error title="not found" description="The page you was looking for was not found on this server" code={404} />
        </main>
      </div>



    </div>
  );
}

export default App;
