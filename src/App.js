import './App.css';
import ProductList from './components/ProductList';
import InputGroup from './components/InputGroup';

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(${process.env.PUBLIC_URL+'assets/background-color-bl.png'})`}}>
      <div style={styles.container}>
        <InputGroup/>
        <ProductList/>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display:'flex', 
    width:'72%', 
    height:'88vh', 
    borderRadius:'20px', 
    flexDirection:'row', 
    backgroundColor:'rgba(255,255,255,0.15)'
  }
}

export default App;
