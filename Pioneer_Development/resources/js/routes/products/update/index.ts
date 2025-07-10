import { queryParams, type QueryParams } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::withfile
 * @see app/Http/Controllers/ProductController.php:326
 * @route '/products/{slug}/update'
 */
export const withfile = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: withfile.url(args, options),
    method: 'post',
})

withfile.definition = {
    methods: ['post'],
    url: '/products/{slug}/update',
}

/**
* @see \App\Http\Controllers\ProductController::withfile
 * @see app/Http/Controllers/ProductController.php:326
 * @route '/products/{slug}/update'
 */
withfile.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    const parsedArgs = {
                        slug: args.slug,
                }

    return withfile.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::withfile
 * @see app/Http/Controllers/ProductController.php:326
 * @route '/products/{slug}/update'
 */
withfile.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: withfile.url(args, options),
    method: 'post',
})
const update = {
    withfile,
}

export default update