import { atom } from 'recoil';

export {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const themeModeAtom = atom<'dark' | 'light'>({
  key: 'themeMode',
  default: 'dark',
});

export const versionAtom = atom({
  key: 'version',
  default: window.app.version(),
});
