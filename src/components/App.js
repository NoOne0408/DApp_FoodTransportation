import React, { Component } from 'react';
import './App.css';
import FoodTransportation from '../abis/FoodTransportation.json'
import Web3 from 'web3';//导入web3库

class App extends React.Component {
  //react控件，初始加载
  async componentWillMount() {
    //连接web3网络
    //加载区块链数据
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  //获取账户
  //连接网络
  //获取合约
  //获取哈希
  async loadBlockchainData() {
    const web3 = window.web3//获取web3对象
    const accounts = await web3.eth.getAccounts()//获取账户列表
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()//获取网络Id
    const networkData_food = FoodTransportation.networks[networkId]//根据网络Id获取网络数据,获取food合约地址
    //获取区块链数据
    if (networkData_food) {
      //获取food管理合约abi和合约部署地址
      const abi_food = FoodTransportation.abi
      const address_food = networkData_food.address
      //获取对应合约
      const contract_food = web3.eth.Contract(abi_food, address_food)
      this.setState({ contract_food :contract_food})
      console.log(contract_food)
      const num=await contract_food.methods.getLocationNum().call()
      console.log(num)

      var div = document.getElementById('showTable');
      div.innerHTML = '';
      this.setState({ showElem: '' });
      for(var i=0;i<num;i++){
        var Location=await contract_food.methods.getLocation(i).call()
        var temp = '<tr><td>' + Location[0] +'</td><td>' +Location[1]+'</td><td>' +Location[2] +'</td>'
        div.innerHTML += temp;
      }
    } else {
      window.alert('Smart Contract not deployed')
    }
  }


  //连接web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)

    } else {
      alert("please use web3")

    }
  }

  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      showElem: 'none',
      showElemTab: 'none',
    };

    this.style = {
      width: '500px',
      width2: '200px',
    }

  }


  //文件提交
  uploadFile = (event) => {

    event.preventDefault()
    console.log('submit!')
    var foodName = document.getElementById('foodname').value;
    var locationAddress = document.getElementById('locationAddress').value;
    var userName = document.getElementById('username').value;

    console.log(foodName)
    console.log(locationAddress)
    console.log(userName)

    this.state.contract_food.methods.addNewLocation(foodName,locationAddress,userName).send({ from: this.state.account }).then((result) => {
      console.log(foodName,locationAddress,userName)
    })
  }

 

  openCity1 = (evt) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabcontent[0].style.display = "";
    tablinks = document.getElementsByClassName("tablinks");
    evt.currentTarget.className += " active";
    console.log(tabcontent)
  }
  render() {
    return (
      <div >
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            FoodTransportation溯源DApp系统
          </a>
          <ul className="navbar-nav px-3">
            
            <li className="nav-item text-nowrop">

              <small className="text-white">用户地址：{this.state.account} </small>

            </li>

          </ul>

        </nav>
        

        <div className="container-fluid mt-5">
        
         
         
          <div className="row">

<div id="mySidenav" className="sidenav">
  
  <a href="javascript:void(0)" className="closebtn" onClick={this.captureFile}>&times;</a>
  
  <a href="#">About</a>
  
  <a href="#">Services</a>
  
  <a href="#">Clients</a>
  
  <a href="#">Contact</a>
</div>
 
            <main role="main" className="col-lg-12 d-flex text-center">


              <div className="content mr-auto ml-auto ">
                {/* <a  target="_blank" rel="noopener noreferrer" >
                  <img src={logo} className="App-logo" alt="logo" width="200px" />
                </a> */}


                <div className="tab">
                  <button className="tablinks" onClick={this.openCity1}>查看</button>
                </div>

                <div id="AddFiles" className="tabcontent" style={{ display: this.state.showElemTab }}>
                <h2>Add Location</h2>
                  <form onSubmit={this.uploadFile}>

                    <text style={{ width: this.style.width2 }}>食物名：</text>
                    <input type='text' id='foodname' style={{ width: this.style.width2 }}  /> <br />

                    <text style={{ width: this.style.width2 }}>运输地：</text>
                    <input type='text' id='locationAddress' style={{ width: this.style.width2 }}  /> <br />

                    <text style={{ width: this.style.width2 }}>运输人：</text>
                    <input type='text' id='username' style={{ width: this.style.width2 }}  /> <br />
                    
                    <input type='submit' />
                  </form>

                  <table border='1'
                    cellPadding="5"
                    style={{ display: this.state.showElem }}>
                    <thead>

                      <th>Name</th>

                      <th>Person</th>

                      <th>Timestamp</th>
                    </thead>
                    <tbody id='showTable'>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
