import React, { Component } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

class ChatRoom extends Component {

    firebaseApp = {
        app: null,
        analytics: null,
        db: null,
        auth: null,
        provider: null
    }

    setConfigFirebaseAndInitialize(){
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID,
            databaseURL: process.env.DATABASE_URL
        };
        
        // Initialize Firebase
        this.firebaseApp.app = initializeApp(firebaseConfig);
        //this.firebaseApp.auth = getAuth(this.firebaseApp.app);
        this.firebaseApp.db = getDatabase(this.firebaseApp.app);

        //onAuthStateChanged(this.firebaseApp.auth, user => { });
        this.firebaseApp.analytics = getAnalytics(this.firebaseApp.app);

    }

    constructor(){

        super();
        this.setConfigFirebaseAndInitialize();
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.state = {
            message: '',
            messages: []
        };

    }

    componentDidMount() {
        const starCountRef = ref(this.firebaseApp.db, 'messages/');
        onValue(starCountRef, (snapshot) => {
            const currentMessages = snapshot.val();
            if(currentMessages != null) {
                this.setState({
                    messages: currentMessages
                });
            }
        });

    }

    updateMessage(e){
        this.setState({ 
            message: e.target.value 
        });
    }

    submitMessage(){
        //console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        const message = {
            id: this.state.messages.length,
            text: this.state.message
        };

        set(ref(this.firebaseApp.db, 'messages/' + message.id ), message).then(() => {
            // Data saved successfully!
            console.log('successfully')
          })
          .catch((error) => {
            // The write failed...
            console.log(error)

          });
        // let listMessages = this.state.messages;
        // listMessages.push(message);
        // this.setState({
        //     messages: listMessages
        // });

        this.setState({
            message: ""
        });

    }

    render() { 
        const currentMessages = this.state.messages.map((message, i) => {
            return (
                <li className="list-group-item list-group-item-action" key={message.id}>{message.text}</li>
            );
        });
        return (
            <div className="card">
                <div className="card-body">
                    <ul className="list-group">
                        { currentMessages }
                    </ul>
                </div>
                <div className="card-footer">
                    <input value={this.state.message} onChange={this.updateMessage} type="text" className="form-control" placeholder="Write a message" />
                    <button className="btn btn-primary btn-block" onClick={this.submitMessage}>Send Message</button>
                </div>
            </div>
        )
    }
}

export default ChatRoom;