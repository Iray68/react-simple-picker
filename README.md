# react-simple-picker
Scrollable number picker

## Picker
| Properties |  Type    | Default | Required | Description      |
| :--------: | :------: | :------:| :------: | :--------------: |
| className  |  String  |        | false   | layout's className |
| style      |  Object  |   {}   | false   | layout's style     |
| scrollerBackground | Hex Color || false||
| minCount   |  Number  | 0 | false||
| initCount  |  Number  | minCount | false ||
|**maxCount**|  Number  |          |**true**||
|preloadCount|  Number  | 2        | false ||
| onChange   | Function |          | false | firing while picker's value changing |
| height     |  Number  |          | false | picker's height             |
| iconAdd    | Component|          | false | icon for adding button      |
| iconMinus  | Component|          | false | icon for subtracting button |
| renderMask | Function | (Mask) => \<Mask \/\> | false | provide Mask Component for customizing |

## Mask
| Properties | Type | Default | Required | Description        |
| :--------: |:----:| :------:| :------: | :----------------: |
| className  |String|         | false    | layout's className |
| style      |Object|   {}    | false    | layout's style     |