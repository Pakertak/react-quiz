import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'


export default class App extends Component {

  render() {
    return (
      <Layout>


        <div style={{
          width: '400px',
          border: '1px solid black'
        }}>
          <h1>Layout works</h1>
        </div>  
      </Layout>
    );
  }
  
}
