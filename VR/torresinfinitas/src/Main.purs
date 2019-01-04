module Main where

--import Control.Monad.Eff.Console
import Prelude
import Effect (Effect)
import Effect.Console (log)
import Control.Monad.Eff.Random (RANDOM, randomInt)
import Data.List (List(..), filter, head)
import Data.Maybe (Maybe)

data Exit = Corredor Exit | Juntura [Exit] | Salon [Exit] | SinSalida

data Direccion = N | E | S | O
data CompDir = Dir Direccion | Arriba | Abajo

--Juntura tiene 3 o mas
--Salon por lo menos 1
{-Invariantes
Rooms can connect to corridors
Corridors can connect to rooms or junctions
Junctions can connect to corridors
-}

crearDungeon largo = Salon [(crearDungeon' (largo-1) )]
    where crearDungeon' l = if l == 0 then SinSalida
                            else case randomInt () of
                                0 -> Corredor crearDungeon' (l-1)
                                1 -> Juntura [crearDungeon' l, crearDungeon' l]
                                2 -> Salon [Exit]
                                _ -> crearDungeon' l

main = log "Hello, World!"
