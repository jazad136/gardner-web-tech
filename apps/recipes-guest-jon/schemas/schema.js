import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import recipe from "./recipe"
import ingredient from "./ingredient"

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    recipe,
    ingredient,
  ]),
})
