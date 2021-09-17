import axios from 'axios';
import { buffers, eventChannel, END } from 'redux-saga';
import api from '../../../../services/api';

export const createUploadFileChannel = (endpoint: string, file: File) => {
  const source = axios.CancelToken.source()
  return eventChannel((emitter) => {
    api.post(endpoint, file, {
      onUploadProgress: (e) => {
        const progress = (e.loaded / e.total) * 100;
        emitter({ progress });
      },
      cancelToken: source.token
    })
      .then((e) => {
        if (e.data[0]['já existe']) {
          emitter({ err: 'Usuário(s) já cadastrado(s)' });
        } else {
          emitter({ success: true });
        }
        emitter(END);
      })
      .catch(() => {
        emitter({ err: 'Erro ao salvar os usuários. Verifique a planilha e tente novamente.' });
        emitter(END);
      })
    return () => {
      source.cancel();
    }
  }, buffers.sliding(2));
}

