import React, { Component } from "react";
import axios from 'axios';

export class Form extends Component {
    constructor(props) {
    super(props);
    this.state = {
        searchTerm: '', 
        starred: false,
        userData: [],
        errorMsg: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    this.setState({searchTerm: event.target.value});
    }

    handleChangeCheckbox(event) {
        this.setState({starred: event.target.checked});
    }

    handleSubmit(event) {
    event.preventDefault(); 
        this.setState({userData: []});
        this.setState({errorMsg: ''});
        let mainState = this;
        
        let sulfix = (this.state.starred)?'/repos?per_page=50':'/starred';
        axios.get(`https://api.github.com/users/${this.state.searchTerm}${sulfix}`)
        .then(res => {
            const userData = res.data;
            this.setState({ userData });
        }).catch(function (error) {
            mainState.setState({errorMsg: 'Nenhum resultado a exibir'});
        });
    
    }
    render(){
        return (
            <main className="search-component">
                <header className="search-header jumbotron">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row align-items-center">
                                <div className="col">
                                    <input id="term" name="term" type="search" 
                                        value={this.state.searchTerm} 
                                        onChange={this.handleChange} 
                                        placeholder="Digite o nome do usuário GitHub" 
                                        className="form-control"
                                    required></input>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <input id="starred" name="starred" type="checkbox" 
                                            onChange={this.handleChangeCheckbox}></input>
                                        <label className="form-check-label pl-2" htmlFor="starred">
                                        Apenas repositórios privados?
                                        </label>                                       
                                    </div>                             
                                </div>
                                <div className="col-2">
                                    <input type="submit" className="btn btn-primary w-100" value="Buscar Repositórios" />
                                </div>
                            </div>
                        </form>   
                    </div>
                </header>
                <section className="search-results">
                    <div className="container">    

                        { this.state.userData.map(repo => 
                            <div className="row">
                                <div className="col-md-8 text-left"><h4>{repo.name}</h4></div>
                                <div className="col-md-4 text-right"><small>Forks: <strong>{repo.forks}</strong> | Watchers: <strong>{repo.watchers}</strong> </small></div>
                                <div className="col-md-12 text-left">
                                    <p>{repo.description}</p>                                  
                                </div>
                                <div className="col-md-12 text-right">
                                    <p><a href={repo.html_url} title={repo.name} _target="_blank">{repo.html_url}</a></p>             
                                    <hr/>                       
                                </div>
                            </div>
                        )}
                        <h3 className="text-center error">{this.state.errorMsg} </h3>
                    </div>
                </section>
                <ul>
                    
                </ul>
            </main>
          );
    }
}