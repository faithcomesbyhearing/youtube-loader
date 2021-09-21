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
