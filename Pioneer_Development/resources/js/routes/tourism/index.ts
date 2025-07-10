import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TourismController::indexPublic
 * @see app/Http/Controllers/TourismController.php:71
 * @route '/destinasi-wisata'
 */
export const indexPublic = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})

indexPublic.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata',
}

/**
* @see \App\Http\Controllers\TourismController::indexPublic
 * @see app/Http/Controllers/TourismController.php:71
 * @route '/destinasi-wisata'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::indexPublic
 * @see app/Http/Controllers/TourismController.php:71
 * @route '/destinasi-wisata'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::indexPublic
 * @see app/Http/Controllers/TourismController.php:71
 * @route '/destinasi-wisata'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::showPublic
 * @see app/Http/Controllers/TourismController.php:226
 * @route '/destinasi-wisata/{slug}'
 */
export const showPublic = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})

showPublic.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::showPublic
 * @see app/Http/Controllers/TourismController.php:226
 * @route '/destinasi-wisata/{slug}'
 */
showPublic.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showPublic.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::showPublic
 * @see app/Http/Controllers/TourismController.php:226
 * @route '/destinasi-wisata/{slug}'
 */
showPublic.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::showPublic
 * @see app/Http/Controllers/TourismController.php:226
 * @route '/destinasi-wisata/{slug}'
 */
showPublic.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::indexAdmin
 * @see app/Http/Controllers/TourismController.php:20
 * @route '/tourism'
 */
export const indexAdmin = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})

indexAdmin.definition = {
    methods: ['get','head'],
    url: '/tourism',
}

/**
* @see \App\Http\Controllers\TourismController::indexAdmin
 * @see app/Http/Controllers/TourismController.php:20
 * @route '/tourism'
 */
indexAdmin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::indexAdmin
 * @see app/Http/Controllers/TourismController.php:20
 * @route '/tourism'
 */
indexAdmin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::indexAdmin
 * @see app/Http/Controllers/TourismController.php:20
 * @route '/tourism'
 */
indexAdmin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:107
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
 * @see app/Http/Controllers/TourismController.php:107
 * @route '/tourism/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::create
 * @see app/Http/Controllers/TourismController.php:107
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
 * @see app/Http/Controllers/TourismController.php:107
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
 * @see app/Http/Controllers/TourismController.php:119
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
 * @see app/Http/Controllers/TourismController.php:119
 * @route '/tourism'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::store
 * @see app/Http/Controllers/TourismController.php:119
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
* @see \App\Http\Controllers\TourismController::archived
 * @see app/Http/Controllers/TourismController.php:367
 * @route '/tourism/archived'
 */
export const archived = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})

archived.definition = {
    methods: ['get','head'],
    url: '/tourism/archived',
}

/**
* @see \App\Http\Controllers\TourismController::archived
 * @see app/Http/Controllers/TourismController.php:367
 * @route '/tourism/archived'
 */
archived.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::archived
 * @see app/Http/Controllers/TourismController.php:367
 * @route '/tourism/archived'
 */
archived.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::archived
 * @see app/Http/Controllers/TourismController.php:367
 * @route '/tourism/archived'
 */
archived.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archived.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::restore
 * @see app/Http/Controllers/TourismController.php:401
 * @route '/tourism/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

restore.definition = {
    methods: ['put'],
    url: '/tourism/{slug}/restore',
}

/**
* @see \App\Http\Controllers\TourismController::restore
 * @see app/Http/Controllers/TourismController.php:401
 * @route '/tourism/{slug}/restore'
 */
restore.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return restore.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::restore
 * @see app/Http/Controllers/TourismController.php:401
 * @route '/tourism/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TourismController::deletePermanent
 * @see app/Http/Controllers/TourismController.php:421
 * @route '/tourism/{slug}/delete-permanent'
 */
export const deletePermanent = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

deletePermanent.definition = {
    methods: ['delete'],
    url: '/tourism/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\TourismController::deletePermanent
 * @see app/Http/Controllers/TourismController.php:421
 * @route '/tourism/{slug}/delete-permanent'
 */
deletePermanent.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return deletePermanent.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::deletePermanent
 * @see app/Http/Controllers/TourismController.php:421
 * @route '/tourism/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TourismController::edit
 * @see app/Http/Controllers/TourismController.php:249
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
 * @see app/Http/Controllers/TourismController.php:249
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
 * @see app/Http/Controllers/TourismController.php:249
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
 * @see app/Http/Controllers/TourismController.php:249
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
 * @see app/Http/Controllers/TourismController.php:265
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
 * @see app/Http/Controllers/TourismController.php:265
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
 * @see app/Http/Controllers/TourismController.php:265
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
 * @see app/Http/Controllers/TourismController.php:345
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
 * @see app/Http/Controllers/TourismController.php:345
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
 * @see app/Http/Controllers/TourismController.php:345
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
* @see \App\Http\Controllers\TourismController::showAdmin
 * @see app/Http/Controllers/TourismController.php:196
 * @route '/tourism/{slug}'
 */
export const showAdmin = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})

showAdmin.definition = {
    methods: ['get','head'],
    url: '/tourism/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::showAdmin
 * @see app/Http/Controllers/TourismController.php:196
 * @route '/tourism/{slug}'
 */
showAdmin.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showAdmin.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::showAdmin
 * @see app/Http/Controllers/TourismController.php:196
 * @route '/tourism/{slug}'
 */
showAdmin.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::showAdmin
 * @see app/Http/Controllers/TourismController.php:196
 * @route '/tourism/{slug}'
 */
showAdmin.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showAdmin.url(args, options),
    method: 'head',
})
const tourism = {
    indexPublic,
showPublic,
indexAdmin,
create,
store,
archived,
restore,
deletePermanent,
edit,
update,
destroy,
showAdmin,
}

export default tourism