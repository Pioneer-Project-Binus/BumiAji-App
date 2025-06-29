import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
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
    url: '/tourism',
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:63
 * @route '/tourism/create'
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
    url: '/tourism/create',
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:63
 * @route '/tourism/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:63
 * @route '/tourism/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:63
 * @route '/tourism/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:68
 * @route '/tourism'
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
    url: '/tourism',
}

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:68
 * @route '/tourism'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:68
 * @route '/tourism'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:142
 * @route '/tourism/{slug}/edit'
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
    url: '/tourism/{slug}/edit',
}

/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:142
 * @route '/tourism/{slug}/edit'
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
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:142
 * @route '/tourism/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:142
 * @route '/tourism/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:150
 * @route '/tourism/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/tourism/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:150
 * @route '/tourism/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::update
 * @see app/Http/Controllers/TourismController.php:150
 * @route '/tourism/{slug}'
 */
update.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:202
 * @route '/tourism/{slug}'
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
    url: '/tourism/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:202
 * @route '/tourism/{slug}'
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
* @see \App\Http\Controllers\TourismController::destroy
 * @see app/Http/Controllers/TourismController.php:202
 * @route '/tourism/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
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
    url: '/tourism/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
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
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})
const tourism = {
    index,
create,
store,
edit,
update,
destroy,
show,
}

export default tourism