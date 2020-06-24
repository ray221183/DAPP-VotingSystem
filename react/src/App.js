import React from 'react';

import SystemProcess from './build/contracts/system_process.json';
import getWeb3 from './utils/getWeb3';

import HomePage from './components/homepage/homepage';
import SetPage from './components/setpage/setpage';
import ViewPage from './components/viewpage/viewpage';
import SelectPage from './components/selectpage/selectpage';
import VotePage from './components/votepage/votepage';


import './App.css';
import './components/topbanner/topbanner.css';
import './components/homepage/homepage.css';
import './components/setpage/setpage.css';
import './components/viewpage/viewpage.css';
import './components/votepage/votepage.css';
 


class App extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      web3: null,
      accounts: null, 
      contract: null ,

      current_page: "HomePage", //decide which page should show

      topicIds: [],
      topics: [],

      current_topic: "", 
      current_topicId: null,
      current_status: 0, //0 hasn't started yet | 1 start | 2 end

      items: [], //view
      current_item: "",

      candidates: [],
      voters: [],

      num_ballot: [],
    };
    this.handleChangePage = this.handleChangePage.bind(this)
    //this.handleUserImfo = this.handleUserImfo.bind(this)
    this.handleTopic = this.handleTopic.bind(this)
    this.read_items = this.read_items.bind(this)
    this.read_cand = this.read_cand.bind(this)
    this.read_voter = this.read_voter.bind(this)
    this.handleCurrentItem = this.handleCurrentItem.bind(this)
    this.get_available_launched = this.get_available_launched.bind(this)
    this.get_topic = this.get_topic.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }


  //////// fetch cand & voter ////////
  //handleCurrentItem (read_voter_candidate_num -> read_cand -> read_voter)
  /////////// render view //////////
  //read_topic (handleTopic -> read_items)
  ///////////
  /////////// add item ///////////
  //SetItem ( read_topic -> handleTopic -> read_items )
  /////////// delete item ////////
  //DelItem ( read_topic -> handleTopic -> read_items )
  ///////////load topics//////////
  //get_available_launched ( get_topic )
  ///////////select topic/////////
  //handleSelect ( find_available_item -> read_item )
  status_control = async(status) => {
    const { contract, accounts, current_topicId } = this.state;
    console.log(status, typeof(status))
    if(status === 1){
      await contract.methods.set_vote_start(
        current_topicId
      ).send({
        from: accounts, 
        gas:1000000},
        (error) => {
            if (error){
                console.log('set_vote_start error')
            }
        })
    }else if(status === 2){
      await contract.methods.set_vote_end(
        current_topicId
      ).send({
        from: accounts, 
        gas:1000000},
        (error) => {
            if (error){
                console.log('set_vote_end error')
            }
        })
      console.log('end')
    }
    this.read_topic()
  }
  get_available_launched = async() => {
    const contract = this.state.contract;
    const userId = this.state.accounts;
    let topicsIds = []
    topicsIds = await contract.methods.get_available_launched(
      userId
    ).call((error) => {
      if (error){
          console.log('find_available_vote error')
      }
    })
    console.log("topicIds: ", topicsIds)
    console.log("topicIds length", topicsIds.length)
    this.setState( { topicIds: topicsIds, items: [] }, function(){console.log('setState complete')})
    await this.get_topic()
    this.handleChangePage("SelectPage")
  }
  get_topic = async() => {
    const { contract, topicIds } = this.state;
    let topics = []
    for(let idx=topicIds.length-1;idx>-1;idx--){
      const topicName = await contract.methods.get_topic(
        topicIds[idx]
      ).call((error) => {
        if (error){
            console.log('get_available_launched error')
        }
      })
      topics.unshift(topicName)
    }
    this.setState( { topics: topics }, function(){console.log('setState complete')})
  }
  handleSelect = async(topicIdx) => {
    const { contract, accounts, topicIds, topics } = this.state;
    const userId = accounts;
    if(topicIdx === -1){
      console.log('1')
      this.setState( { items: [] }, function(){console.log('setState complete')})
    }
    else{
      console.log('2')
      this.setState( { current_topicId : topicIds[topicIdx], current_topic: topics[topicIdx] }, function(){console.log('setState complete')})
      console.log(this.state.current_topicId)
      //get status
      const status = await contract.methods.find_state(
        topicIds[topicIdx]
      ).call((error) => {
        if (error){
            console.log('find_state error')
        }
      })
      this.setState( { current_status: status }, function(){console.log('setState complete')})
      //get available items' indices
      let itemIdx = []
      console.log(topicIds[topicIdx], typeof(parseInt(topicIds[topicIdx])))
      console.log(userId, typeof(userId))
      itemIdx = await contract.methods.find_available_item(
        parseInt(topicIds[topicIdx]),
        userId
      ).call((error) => {
        if (error){
            console.log('find_available_item error')
        }
      })

      let items = []
      for(let idx=0; idx<itemIdx.length; idx++){
        const itemName = await contract.methods.read_item(
          topicIds[topicIdx],
          itemIdx[idx]
        ).call((error) => {
          if (error){
              console.log('read_item error')
          }
        })
        items.unshift(itemName)
      }
      console.log("items:", items)
      this.setState({items: items}, function(){console.log('setState complete')})
    }
  }

  SetItem = async(itemName) => {
    const { accounts, contract, current_topicId } = this.state;
    await contract.methods.SetItem(
      current_topicId,
      itemName
    ).send({
      from: accounts, 
      gas:1000000},
      (error) => {
          if (error){
              console.log('SetItem error')
          }
      })
    this.read_topic()
  }
  DelItem = async(itemName) => {
    const { accounts, contract, current_topicId } = this.state;
    await contract.methods.DelItem(
      current_topicId,
      itemName
    ).send({
      from: accounts, 
      gas:1000000},
      (error) => {
          if (error){
              console.log('DelItem error')
          }
      })
    this.read_topic()
  }
  read_topic = async() => {
    const contract = this.state.contract;
    const userId = this.state.accounts;
    //const {topicId, topicName, itemNum, status}= await contract.methods.read_topic(\
    var get = []
    console.log(userId)
    get = await contract.methods.read_topic(
      userId
    ).call((error) => {
      if (error){
          console.log('read_topic error')
      }
    })
    console.log('topicId:', get[0], 'topicName:', get[1], 'itemNum:', get[2], 'status:', get[3])
    this.handleTopic(get[0], get[1], get[2], get[3])
  }
  read_items = async(itemNum) => {
    const { contract, current_topicId } = this.state;
    let items = []
    for(let idx=0;idx<itemNum;idx++){
      const itemName = await contract.methods.read_item(
        current_topicId,
        idx
      ).call((error) => {
        if (error){
            console.log('read_item error')
        }
      })
      items.unshift(itemName)
    }
    console.log("items:", items)
    this.setState({items: items}, function(){console.log('setState complete')})
  }
  read_voter_candidate_num = async(itemName, page) => {
    const { contract, current_topicId, current_item } = this.state;
    console.log("current_topicId:", current_topicId, "current_item:",current_item)
    var get = []
    console.log("current_topicId", current_topicId, "current_item", current_item)
    console.log('itemName', itemName, typeof(itemName))
    get = await contract.methods.read_voter_candidate_num(
      current_topicId,
      String(itemName)
    ).call((error) => {
      if (error){
          console.log('read_voter_candidate_num error')
      }
    })
    console.log("voterNum", get[0], "candNum", get[1])
    await this.read_voter(get[0])
    await this.read_cand(get[1])
    if(page === 0){
      this.handleChangePage("SetPage")
    }
    else if(page === 1){
      this.handleChangePage("VotePage")
    }
    else{
      console.log('candidates', this.state.candidates)
      let result = []
      for(let idx=this.state.candidates.length-1; idx>-1; idx--){
        console.log('idx', idx)
        console.log('candidates[idx]', this.state.candidates[idx])
        const num = await contract.methods.view_result(
          current_topicId,
          itemName,
          this.state.candidates[idx]
        ).call((error) => {
          if (error){
              console.log('view_result error')
          }
        })
        result.unshift(num)
      }
      console.log('result', result)
      this.setState( { num_ballot: result }, function(){console.log('setState complete')} )
      //this.handleChangePage("FinalPage")
      this.handleChangePage("VotePage")
    }
    
  }
  read_cand = async(candidateNum) => {
    const { contract, current_topicId, current_item } = this.state;
    let candidates = []
    for(let idx=0;idx<candidateNum;idx++){
      const candName = await contract.methods.read_cand(
        current_topicId,
        current_item,
        idx
      ).call((error) => {
        if (error){
            console.log('read_cand error')
        }
      })
      candidates.unshift(candName)
    }
    this.setState( { candidates: candidates }, function(){console.log('setState complete')} )
    console.log("candidate", this.state.candidates)
  }
  read_voter = async(voterNum) => {
    const { contract, current_topicId, current_item } = this.state;
    let voters = []
    for(let idx=0;idx<voterNum;idx++){
      const voterName = await contract.methods.read_voter(
        current_topicId,
        current_item,
        idx
      ).call((error) => {
        if (error){
            console.log('read_voter error')
        }
      })
      voters.unshift(voterName)
    }
    this.setState( { voters: voters }, function(){console.log('setState complete')} )
    console.log("voters", this.state.voters)
  }
  handleTopic = (topicid, topicName, number, status) => {
    this.setState({
      current_topicId: topicid,
      current_topic: topicName,
      current_status: status
    }, function(){console.log('setState complete')})
    this.read_items(number)
  }
  handleCurrentItem = async ( itemName, page ) => {
    this.setState( {current_item: itemName},  function(){console.log('setState complete')})
    this.read_voter_candidate_num(itemName, page)
  }


  handleChangePage = (nextpage) => {
    this.setState({current_page: nextpage})
  }
  /*handleUserImfo = (account, hasvalid) => {
    this.setState({userId: account, valid: hasvalid}, function(){console.log('setState complete')})
  }*/

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.currentProvider.selectedAddress;
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SystemProcess.networks[networkId];
      const instance = new web3.eth.Contract(
        SystemProcess.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log('accounts', accounts)
      console.log('selectedAddress', web3.eth.currentProvider.selectedAddress)
      //const userId = await web3.eth.currentProvider.selectedAddress//////////////////////////////////////////////////////////////
      this.setState({ web3, accounts, contract: instance});///////////////////////////////////////////////////////////
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    ////HomePage////
    if (this.state.current_page === "HomePage"){
      return(
        <div className="homebackground">
          <HomePage
            data={this.state}
            handleChangePage = {this.handleChangePage}
            handleTopic = {this.handleTopic}
            read_topic = {this.read_topic}
            get_available_launched = {this.get_available_launched}
          />
        </div>
      );
    }
    // ////StartPage////
    // else if (this.state.current_page === "StartPage"){
    //   return (
    //     <div className="background">
    //       <StartPage 
    //         data={this.state}
    //         handleChangePage = {this.handleChangePage}
    //         //handleUserImfo = {this.handleUserImfo}
    //         read_topic = {this.read_topic}
    //       />
		//     </div>
    //   );
    // }
    // ////NewAccountPage////
    // else if(this.state.current_page === "NewAccountPage"){
    //   return(
    //     <div className="background">
    //       <NewAccountPage 
    //         data={this.state}
    //         handleChangePage = {this.handleChangePage}
    //         read_topic = {this.read_topic}
    //       />	  	
    //     </div>
    //   );
    // }
    ////setpage////
    else if(this.state.current_page === "SetPage"){
      return(
        <div className="background">
          <SetPage 
            data={this.state}
            handleChangePage = {this.handleChangePage}
            read_topic = {this.read_topic}
          />
        </div>
      );
    }
    ////ViewPage////
    else if(this.state.current_page === "ViewPage"){
      return(
        <div className="background">
          <ViewPage 
            data={this.state}
            handleChangePage = {this.handleChangePage}
            handleCurrentItem = {this.handleCurrentItem}
            SetItem = {this.SetItem}
            DelItem = {this.DelItem}
            read_topic = {this.read_topic}
            status_control = {this.status_control}
          />
        </div>
      );
    }
    ////SelectPage////
    else if(this.state.current_page === "SelectPage"){
      return(
        <div className="background">
          <SelectPage 
            data={this.state}
            handleChangePage = {this.handleChangePage}
            read_topic = {this.read_topic}
            handleCurrentItem = {this.handleCurrentItem}
            handleSelect = {this.handleSelect}
          />
        </div>
      );
    }
    ////VotePage////
    else if(this.state.current_page === "VotePage"){
      return(
        <div className="background">
          <VotePage 
            data={this.state}
            handleChangePage = {this.handleChangePage}
            read_topic = {this.read_topic}
          />
        </div>
      );
    }
    ////else(default HomePage)////
    else {
      return(
        <div className="homebackground">
          <HomePage
            data={this.state}
            handleChangePage = {this.handleChangePage}
            handleTopic = {this.handleTopic}
            read_topic = {this.read_topic}
            get_available_launched = {this.get_available_launched}
          />
        </div>
      );
    }
  }
}


export default App;
