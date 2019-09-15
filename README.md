# react-simple-picker

Scrollable number picker

See [Demo Page](https://iray68.github.io/react-simple-picker/)

## Installation

`npm install react-simple-picker` or `yarn add react-simple-picker`

## Usage

```jsx
<Picker maxCount={59} />
```

or You can set maximal and minimal number with custom mask and onChange event function

```jsx
<Picker
  height={300}
  iconAdd={<div>+</div>}
  iconMinus={<div>-</div>}
  initCount={2019}
  minCount={1970}
  maxCount={2999}
  preloadCount={8}
  renderMask={Mask => <Mask className={styles.dateMask} />}
  onChange={number => console.log('year', number)}
/>
```

## Picker

|     Properties     |    Type     |        Default        | Required? |              Description               |
| :----------------: | :---------: | :-------------------: | :-------: | :------------------------------------: |
|     className      |   String    |                       |           |           layout's className           |
|       style        | StyleSheet  |                       |           |             layout's style             |
| scrollerBackground |  Hex Color  |                       |           |                                        |
|      minCount      |   Number    |           0           |           |                                        |
|     initCount      |   Number    |       minCount        |           |                                        |
|    **maxCount**    |   Number    |                       |     ✓     |                                        |
|    preloadCount    |   Number    |           2           |           |                                        |
|      onChange      |  Function   |                       |           |  firing while picker's value changing  |
|       height       |   Number    |                       |           |            picker's height             |
|      iconAdd       | HTMLElement |                       |           |         icon for adding button         |
|     iconMinus      | HTMLElement |                       |           |      icon for subtracting button       |
|     renderMask     |  Function   | (Mask) => \<Mask \/\> |           | provide Mask Component for customizing |

## Mask

| Properties |    Type    | Default | Required? |    Description     |
| :--------: | :--------: | :-----: | :-------: | :----------------: |
| className  |   String   |         |           | layout's className |
|   style    | StyleSheet |         |           |   layout's style   |
