import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
const index4c48effeb32b4cab50d9844d53f44e55 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'get',
})

index4c48effeb32b4cab50d9844d53f44e55.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata',
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index4c48effeb32b4cab50d9844d53f44e55.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/destinasi-wisata'
 */
index4c48effeb32b4cab50d9844d53f44e55.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index4c48effeb32b4cab50d9844d53f44e55.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
const index41b7fcc6dd08fb162005d0508f4aaab2 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index41b7fcc6dd08fb162005d0508f4aaab2.url(options),
    method: 'get',
})

index41b7fcc6dd08fb162005d0508f4aaab2.definition = {
    methods: ['get','head'],
    url: '/tourism',
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index41b7fcc6dd08fb162005d0508f4aaab2.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index41b7fcc6dd08fb162005d0508f4aaab2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index41b7fcc6dd08fb162005d0508f4aaab2.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index41b7fcc6dd08fb162005d0508f4aaab2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::index
 * @see app/Http/Controllers/TourismController.php:14
 * @route '/tourism'
 */
index41b7fcc6dd08fb162005d0508f4aaab2.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index41b7fcc6dd08fb162005d0508f4aaab2.url(options),
    method: 'head',
})

export const index = {
    '/destinasi-wisata': index4c48effeb32b4cab50d9844d53f44e55,
    '/tourism': index41b7fcc6dd08fb162005d0508f4aaab2,
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/destinasi-wisata/{slug}'
 */
const show004488e211389df99553cd16e1a14fe3 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'get',
})

show004488e211389df99553cd16e1a14fe3.definition = {
    methods: ['get','head'],
    url: '/destinasi-wisata/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show004488e211389df99553cd16e1a14fe3.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/destinasi-wisata/{slug}'
 */
show004488e211389df99553cd16e1a14fe3.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show004488e211389df99553cd16e1a14fe3.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
const showa8a832fc478cc4cfc2d0194df7da5aa7 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa8a832fc478cc4cfc2d0194df7da5aa7.url(args, options),
    method: 'get',
})

showa8a832fc478cc4cfc2d0194df7da5aa7.definition = {
    methods: ['get','head'],
    url: '/tourism/{slug}',
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
showa8a832fc478cc4cfc2d0194df7da5aa7.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showa8a832fc478cc4cfc2d0194df7da5aa7.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
showa8a832fc478cc4cfc2d0194df7da5aa7.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showa8a832fc478cc4cfc2d0194df7da5aa7.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:117
 * @route '/tourism/{slug}'
 */
showa8a832fc478cc4cfc2d0194df7da5aa7.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showa8a832fc478cc4cfc2d0194df7da5aa7.url(args, options),
    method: 'head',
})

export const show = {
    '/destinasi-wisata/{slug}': show004488e211389df99553cd16e1a14fe3,
    '/tourism/{slug}': showa8a832fc478cc4cfc2d0194df7da5aa7,
}

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
* @see \App\Http\Controllers\TourismController::archivedIndex
 * @see app/Http/Controllers/TourismController.php:219
 * @route '/tourism/archived'
 */
export const archivedIndex = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})

archivedIndex.definition = {
    methods: ['get','head'],
    url: '/tourism/archived',
}

/**
* @see \App\Http\Controllers\TourismController::archivedIndex
 * @see app/Http/Controllers/TourismController.php:219
 * @route '/tourism/archived'
 */
archivedIndex.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archivedIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::archivedIndex
 * @see app/Http/Controllers/TourismController.php:219
 * @route '/tourism/archived'
 */
archivedIndex.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::archivedIndex
 * @see app/Http/Controllers/TourismController.php:219
 * @route '/tourism/archived'
 */
archivedIndex.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archivedIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TourismController::restore
 * @see app/Http/Controllers/TourismController.php:247
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
 * @see app/Http/Controllers/TourismController.php:247
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
 * @see app/Http/Controllers/TourismController.php:247
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
 * @see app/Http/Controllers/TourismController.php:261
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
 * @see app/Http/Controllers/TourismController.php:261
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
 * @see app/Http/Controllers/TourismController.php:261
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
const TourismController = { index, show, create, store, archivedIndex, restore, deletePermanent, edit, update, destroy }

export default TourismController