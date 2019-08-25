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
  iconAdd={IconAdd}
  iconMinus={IconMinus}
  initCount={2019}
  minCount={1970}
  maxCount={2999}
  preloadCount={8}
  renderMask={Mask => <Mask className={styles.dateMask} />}
  onChange={number => console.log('year', number)}
/>
```

## Picker

|     Properties     |   Type    |        Default        | Required |              Description               |
| :----------------: | :-------: | :-------------------: | :------: | :------------------------------------: |
|     className      |  String   |                       |  false   |           layout's className           |
|       style        |  Object   |          {}           |  false   |             layout's style             |
| scrollerBackground | Hex Color |                       |  false   |                                        |
|      minCount      |  Number   |           0           |  false   |                                        |
|     initCount      |  Number   |       minCount        |  false   |                                        |
|    **maxCount**    |  Number   |                       | **true** |                                        |
|    preloadCount    |  Number   |           2           |  false   |                                        |
|      onChange      | Function  |                       |  false   |  firing while picker's value changing  |
|       height       |  Number   |                       |  false   |            picker's height             |
|      iconAdd       | Component |                       |  false   |         icon for adding button         |
|     iconMinus      | Component |                       |  false   |      icon for subtracting button       |
|     renderMask     | Function  | (Mask) => \<Mask \/\> |  false   | provide Mask Component for customizing |

## Mask

| Properties |  Type  | Default | Required |    Description     |
| :--------: | :----: | :-----: | :------: | :----------------: |
| className  | String |         |  false   | layout's className |
|   style    | Object |   {}    |  false   |   layout's style   |
