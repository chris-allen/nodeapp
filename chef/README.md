# chef-nodeapp-cookbook

TODO: Enter the cookbook description here.

## Supported Platforms

TODO: List your supported platforms.

## Attributes

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><tt>['chef-nodeapp']['bacon']</tt></td>
    <td>Boolean</td>
    <td>whether to include bacon</td>
    <td><tt>true</tt></td>
  </tr>
</table>

## Usage

### chef-nodeapp::default

Include `chef-nodeapp` in your node's `run_list`:

```json
{
  "run_list": [
    "recipe[chef-nodeapp::default]"
  ]
}
```

## License and Authors

Author:: Chris Allen (<chris@apaxsoftware.com>)
