import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type IAuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type IAuthProvider = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type IAuthCotextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as IAuthCotextData);

export function AuthProvider(props: IAuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `http://github.com/login/oauth/authorize?scope=user&client_id=${'1e46ce53dd825d392a2b'}`;

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>('profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  async function signIn(githubCode: string) {
    const response = await api.post<IAuthResponse>('authenticate', {
      code: githubCode,
    });
    const { token, user } = response.data;
    localStorage.setItem('@dowhile:token', token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  return <AuthContext.Provider value={{ signInUrl, user, signOut }}>{props.children}</AuthContext.Provider>;
}
