module.exports = {
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    trailingComma: 'es5',
    bracketSameLine: true,
    printWidth: 80,
    endOfLine: 'auto',
    overrides: [
        {
            files: '*.scss',
            options: {
                singleQuote: false,
            },
        },
        {
            files: '*.html',
            options: {
                printWidth: 120,
            },
        },
        {
            files: '*.js',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
