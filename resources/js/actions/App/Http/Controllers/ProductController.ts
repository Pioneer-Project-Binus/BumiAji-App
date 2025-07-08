import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:16
 * @route '/produk'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/produk',
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:16
 * @route '/produk'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:16
 * @route '/produk'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:16
 * @route '/produk'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:122
 * @route '/produk/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/produk/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:122
 * @route '/produk/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:122
 * @route '/produk/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:122
 * @route '/produk/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/products/create',
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:68
 * @route '/products'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/products',
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:68
 * @route '/products'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:68
 * @route '/products'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/products/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/products/{slug}/edit',
}

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/products/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/products/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/products/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}'
 */
const update0cba029d50e47125a3214f2b5292d469 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update0cba029d50e47125a3214f2b5292d469.url(args, options),
    method: 'put',
})

update0cba029d50e47125a3214f2b5292d469.definition = {
    methods: ['put'],
    url: '/products/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}'
 */
update0cba029d50e47125a3214f2b5292d469.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update0cba029d50e47125a3214f2b5292d469.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}'
 */
update0cba029d50e47125a3214f2b5292d469.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update0cba029d50e47125a3214f2b5292d469.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}/update'
 */
const update4c9815caad8aaa671f52bd4158188027 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update4c9815caad8aaa671f52bd4158188027.url(args, options),
    method: 'post',
})

update4c9815caad8aaa671f52bd4158188027.definition = {
    methods: ['post'],
    url: '/products/{slug}/update',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}/update'
 */
update4c9815caad8aaa671f52bd4158188027.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update4c9815caad8aaa671f52bd4158188027.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:162
 * @route '/products/{slug}/update'
 */
update4c9815caad8aaa671f52bd4158188027.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update4c9815caad8aaa671f52bd4158188027.url(args, options),
    method: 'post',
})

export const update = {
    '/products/{slug}': update0cba029d50e47125a3214f2b5292d469,
    '/products/{slug}/update': update4c9815caad8aaa671f52bd4158188027,
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:218
 * @route '/products/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/products/{slug}',
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:218
 * @route '/products/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:218
 * @route '/products/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ProductController = { index, show, create, store, edit, update, destroy }

export default ProductController