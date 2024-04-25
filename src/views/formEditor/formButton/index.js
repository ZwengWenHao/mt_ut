export default [
    {
        label: '文本说明',
        code: 'textDescription',
        individuation: true,
    },
    {
        label: '分割线',
        code: 'crossLine'
    },
    {
        label: '单行文本',
        code: 'inputForm',
        value: '',
        individuation: true
    },
    {
        label: '多行文本',
        code: 'inputTextareaForm',
        value: '',
        individuation: true
    },
    {
        label: '时间',
        code: 'timeForm',
        value: '',
        individuation: true,
        typeList: [
            { format: 'yyyy-MM-dd', value: '2', label: '日期', type: 'date' },
            { format: 'yyyy-MM-dd HH:mm:ss', value: '1', label: '时间', type: 'datetime' },
        ],
        typeValue: '1'
    },
    {
        label: '单选框',
        code: 'radioForm',
        value: '',
        individuation: true,
        isCustom: false,
        options: []
    },
    {
        label: '复选框',
        code: 'checkbox',
        value: '',
        individuation: true,
        isCustom: false,
        options: []
    },
    {
        label: '复选框组',
        code: 'checkboxForm',
        value: [],
        individuation: true,
        isCustom: false,
        options: []
    },
    {
        label: '单选下拉',
        code: 'selectForm',
        value: '',
        individuation: true,
        isCustom: false,
        options: []
    },
    {
        label: '签名',
        code: 'signature',
        value: '',
        individuation: true,
        isCustom: false,
        options: []
    },
    {
        label: '表格',
        code: 'statistics',
        value: '',
        individuation: true,
        isCustom: true,
        options: [],
        tableData: [
            { label: 'a' },
            { label: 'b' }
        ]
    },
    {
        label: '图片',
        code: 'pictures',
        valule: [],
        individuation: true

    },
    {
        label: '视频',
        code: 'uploadVideo',
        valule: [],
        individuation: true
    }
]