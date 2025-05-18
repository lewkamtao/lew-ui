export default {
  name: 'pt',
  image: {
    fail: 'Não foi possível carregar a imagem, por favor tente novamente mais tarde'
  },
  input: {
    placeholder: 'Por favor, digite',
    copy: 'Copiar',
    copySuccess: 'Copiado para a área de transferência',
    copyFailed: 'Falha ao copiar, por favor tente novamente'
  },
  inputTag: {
    placeholder: 'Digite e pressione Enter para adicionar uma tag',
    maxLength:
      'Atingiu o limite de {maxLength} tags, remova algumas para continuar adicionando',
    duplicate: 'Esta tag já existe, por favor digite uma nova tag'
  },
  select: {
    placeholder: 'Por favor, selecione'
  },
  selectMultiple: {
    placeholder: 'Por favor, selecione'
  },
  cascader: {
    placeholder: 'Por favor, selecione',
    close: 'Fechar',
    ok: 'OK'
  },
  textarea: {
    placeholder: 'Por favor, digite'
  },
  inputNumber: {
    placeholder: 'Por favor, digite'
  },
  datePicker: {
    Mon: 'Seg',
    Tue: 'Ter',
    Wed: 'Qua',
    Thu: 'Qui',
    Fri: 'Sex',
    Sat: 'Sáb',
    Sun: 'Dom',
    placeholder: 'Selecionar data'
  },
  dateRangePicker: {
    placeholderStart: 'Data inicial',
    placeholderEnd: 'Data final'
  },
  inputTable: {
    addText: 'Adicionar',
    deleteConfirm: 'Confirmar exclusão',
    delete: 'Excluir',
    cancel: 'Cancelar',
    deleteConfirmContent: 'Tem certeza que deseja excluir estes dados? Esta operação será aplicada imediatamente, por favor tenha cuidado!',
    minRows: 'Limite mínimo de linhas atingido, não é possível excluir',
    maxRows: 'Limite máximo de linhas atingido, não é possível adicionar',
    uniqueFieldExist: 'Este {label} já existe. Por favor, digite um {label} único.',
    save: 'Salvar',
    modelTitle: 'Adicionar dados',
    editTitle: 'Editar dados'
  },
  drawer: {
    close: 'Fechar',
    ok: 'OK'
  },
  modal: {
    close: 'Fechar',
    ok: 'OK'
  },
  dialog: {
    cancel: 'Cancelar',
    ok: 'OK'
  },
  popok: {
    cancel: 'Cancelar',
    ok: 'OK'
  },
  upload: {
    dropActive: 'Solte para iniciar o upload',
    click: 'Clique para fazer upload, ',
    paste: 'cole, ',
    drag: 'ou arraste arquivos para aqui',
    accept: 'Suporta upload de {accept}',
    limit: 'Máximo de {limit} arquivos podem ser enviados',
    maxFileSize: 'Cada arquivo não deve exceder {maxFileSize}'
  },
  pagination: {
    pageSize: '{pageSize} por página'
  }
}
