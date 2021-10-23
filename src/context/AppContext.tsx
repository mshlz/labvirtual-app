import Router, { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../components/Loading/Loading";
import { DisciplineService } from "../services/DisciplineService";
import { LocalStorage } from "../utils/LocalStorage";

interface AppContextData {
    signed: boolean
    user: { name, type, email, avatar_url, _id }
    login: (a?: any) => any
    logout: () => void
    isLoading: boolean
    setIsLoading: (a?: any) => any

    disciplines: any[]
    loadDisciplines: () => void
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export const AppProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [disciplines, setDisciplines] = useState([])
    const { route } = useRouter()

    useEffect(() => {
        // Load state
        // setTimeout(() => {
        setUser(LocalStorage.get('app-user'))
        setToken(LocalStorage.get('app-token'))

        loadDisciplines()
        setIsLoading(false)
        // }, 100)
    }, [])

    const loadDisciplines = async () => {
        const result = await DisciplineService.getAllWithSubjects()
        setDisciplines(result)
    }

    const login = (data) => {
        setUser(data.user)
        setToken(data.token)
        LocalStorage.set('app-user', data.user)
        LocalStorage.set('app-token', data.token)
        Router.push('/')
        setIsLoading(false)
    }

    const logout = () => {
        console.log('logout')
        LocalStorage.remove('app-user')
        LocalStorage.remove('app-token')
        Router.push('/auth')
    }

    return (
        <AppContext.Provider value={{ signed: Boolean(user), user, login, logout, isLoading, setIsLoading, disciplines, loadDisciplines }}>
            {isLoading ?
                <LoadingComponent />
                : (!user || !token) && !route.includes('auth') ?
                    Router.push('/auth')
                    : children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext)
}

export default AppContext