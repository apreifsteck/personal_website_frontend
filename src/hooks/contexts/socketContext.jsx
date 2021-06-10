import React, { useContext, useEffect, useState } from 'react';
import {Socket} from 'phoenix'
import {useAuth} from './authContext'

const SocketContext = React.createContext()
export const useSocket = () => useContext(SocketContext)

export const useChannel = (channel_route, opts) => {
    const socket = useSocket()
    const [channel, setChannel] = useState(null)
    useEffect(() => {
        socket.onOpen(() => {
            const channel = socket.channel(channel_route, opts)
            channel.join(channel, opts)
            .receive("ok", resp => {
                console.log("joined channel ", channel_route)
            })
            .receive("err", err => { console.log("error: ", err)})
            .receive("timeout", () => {console.log("Timeout when connecting to channel", channel_route)})
            setChannel(channel)
        })
    }, [socket, channel_route, opts])
    return channel
}

const SocketProvider = ({children}) => {
    const [authState, ] = useAuth()
    const socket = new Socket(`${process.env.REACT_APP_WEBSOCKET_URL}/socket`, {
        params: {token: authState.userToken},
        // logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
    })
    useEffect(() => {
        socket.connect()
    }, [socket, authState])
    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>     
    );
};
export default SocketProvider;