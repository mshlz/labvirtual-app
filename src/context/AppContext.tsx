import Router, { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../components/Loading/Loading";
import { User } from "../models/User";
import { DisciplineService } from "../services/DisciplineService";
import { LocalStorage } from "../utils/LocalStorage";

interface AppContextData {
    isLoggedIn: boolean
    user: User
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
        setUser(LocalStorage.get('app-user'))
        setToken(LocalStorage.get('app-token'))

        loadDisciplines()
        setIsLoading(false)
    }, [])

    const loadDisciplines = async () => {
        const result = await DisciplineService.getAllWithSubjects()
        setDisciplines(result)
    }

    const login = (data) => {
        setUser(User.create(data.user))
        setToken(data.token)
        LocalStorage.set('app-user', data.user)
        LocalStorage.set('app-token', data.token)
        Router.push('/')
        setIsLoading(false)
    }

    const logout = () => {
        LocalStorage.remove('app-user')
        LocalStorage.remove('app-token')
        Router.push('/auth')
    }

    return (
        <AppContext.Provider value={{ isLoggedIn: Boolean(user), user, login, logout, isLoading, setIsLoading, disciplines, loadDisciplines }}>
            {isLoading ?
                <LoadingComponent />
                : (!user || !token) && !route.includes('auth') ?
                    Router.push('/auth')
                    : children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
